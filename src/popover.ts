import * as $ from "jquery";
import * as profileTemplate from "./templates/profile.html";
import * as popoverTemplate from "./templates/popover.html";
import * as containerTemplate from "./templates/container.html";
import * as progressTemplate from "./templates/progress.html";
import * as failTemplate from "./templates/fail.html";
import * as emptyTemplate from "./templates/empty.html";
import * as workTemplate from "./templates/work.html";
import * as workPositionTemplate from "./templates/workPosition.html";
import {randomInteger} from "./random";

class Profile {
    socialLinkPicture: string;
    photoPreview: string;
    workPosition: string;
    workPositionTemplate: string;
    work: string;
    workTemplate: string;
}

let selectors: Set<string> = new Set<string>();

function render(contentData: Profile[]): string {
    if (!contentData) return;
    contentData.map(function (contentDataItem) {
        contentDataItem.socialLinkPicture = `https://integrum.ru/Assets/img/social/small/${contentDataItem.socialKey}.png`;
        if (!contentDataItem.photoPreview) {
            contentDataItem.photoPreview = '/Images/default-image.png';
        }
    });
    let profiles = contentData.map(listItem => {
        if (listItem.workPosition && typeof listItem.workPositionTemplate === 'undefined') {
            listItem.workPosition = workPositionTemplate(listItem);
        } else if (!listItem.workPosition) {
            listItem.workPosition = '';
        }

        if (listItem.work && typeof listItem.workTemplate === 'undefined') {
            listItem.workTemplate = workTemplate(listItem);
        } else if (!listItem.work) {
            listItem.workTemplate = '';
        }

        return profileTemplate(listItem)
    });

    let profilesHtml = profiles.join('\n');

    return popoverTemplate({profilesHtml});
}

function initPlacement() {

    $.fn.popover.Constructor.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {

        return placement == 'bottom' ? {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2} :
            placement == 'bottom-right' ? {top: pos.top + pos.height, left: pos.left} :
                placement == 'bottom-left' ? {top: pos.top + pos.height, left: pos.left + pos.width - actualWidth} :
                    placement == 'top' ? {
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    } :
                        placement == 'left' ? {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left - actualWidth
                        } :
                            {
                                top: pos.top + pos.height / 2 - actualHeight / 2,
                                left: pos.left + pos.width
                            }

    }
}

function init(selector: string, options: any): void {

    let currentRequest = null;

    options = options || {};
    if (!jQuery) throw new Error('Необходимо предварительно подключить jQuery.js');
    if (!selector) throw new Error('Необходимо указать селектор элемента, при клике на который нужно показывать поповер');
    // if (!options.url) throw new Error('Необходимо указать в options.url ссылку на api');
    if (!options.triggerEvent ||
        options.triggerEvent.toLowerCase() !== 'hover' &&
        options.triggerEvent.toLowerCase() !== 'click') {
        throw new Error('Необходимо указать тип события для инициализации тултипа: "hover" или "click"');
    }
    if (!$.fn.popover) throw new Error('Необходимо предварительно подключить bootstrap popover.js');

    initPlacement();

    selectors.add(selector);

    selectors.forEach(selector => {
        let randId = randomInteger(10000, 99999),
            contentHook = '.js-popover-content-hook-' + randId,
            el = $(selector);

        if (!el.data('event-type')) {
            el.data('event-type', options.triggerEvent.toLowerCase());
        }

        el.popover({
            html: true,
            container: 'html',
            placement: options.popoverPlacement ? options.popoverPlacement : 'bottom-right',
            trigger: 'manual',
            template: containerTemplate({contentHook: contentHook.replace(/\./g, ''), initedBy: options.triggerEvent}),
            content: progressTemplate()
        });

        if (el.data('event-type') === 'hover') {
            $(document).off('mouseenter', selector);

            $(document).on('mouseenter', selector, e => initTooltip(e, contentHook));

            $(document).on('mouseleave', selector, e => {
                let target = e.currentTarget;
                let relatedTarget = e.relatedTarget;
                $(document).off('mouseenter', selector);
                /* Отписываемся от события ховера на селекторе, чтобы далее всплывающее окно
                 не инициализировалось повторно, когда шаримся мышкой между иконкой и всплывающим окном */

                if ($(relatedTarget).hasClass('popover')) {
                    $(document).off('mouseleave', '.popover'); // Отписываемся от события mouseleave на всплывающем окне, иначе они накапливаются
                    $(document).on('mouseleave', '.popover', e => {
                        if ($('.popover').data('triggerType') === 'click') return;
                        if ($(e.relatedTarget).parents(selector).length) return;
                        /* Если курсор переходит со всплывающего окна на иконку, то дальше
                         функция не выполняется, иначе всплывающее окно будет скрыто */
                        $(document).on('mouseenter', selector, e => initTooltip(e, contentHook)); // Перед скрытием окна заново подписываемся на ховер
                        $(e.currentTarget).popover('hide');
                    });
                    return;
                }

                $(document).on('mouseenter', selector, e => initTooltip(e, contentHook)); // Перед скрытием окна заново подписываемся на ховер
                $(target).popover('hide');
            });
        } else if (el.data('event-type') === 'click') {
            $(document).off('click', selector);

            $(document).on('click', selector, e => initTooltip(e, contentHook));

            $(document).on('click', 'body', e => {
                if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) {
                    selectors.forEach(selector => {
                        $(selector).popover('hide');
                    })
                }
            });

            $(document).on('hidden.bs.popover', 'body', e => {
                $(e.target).data("bs.popover").inState.click = false;
            });
        }
    });

    function initTooltip(e, contentHook) {
        let target = e.currentTarget,
            dataOptions = $(target).data('options'),
            profileOptions = $(target).data('profile') && $(target).data('profile').profiles || null;

        $(target).popover('show');
        $('.popover-content').html(progressTemplate());

        if (options.isIchp) dataOptions.isIchp = true;

        selectors.forEach(selector => {
            $(selector).not(target).popover('hide');
        });

        if (profileOptions && profileOptions.length) {
            beforeSend();
            success(contentHook, profileOptions);
            return;
        }

        currentRequest = $.ajax({
            url: options.url,
            method: "POST",
            beforeSend: beforeSend,
            data: JSON.stringify(dataOptions),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                401: () => {
                    location.reload()
                }
            },
            success: success(contentHook),
            error: error(contentHook)
        });
    }

    function beforeSend(request?) {
        if (request) request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (currentRequest) {
            currentRequest.abort();
        }
    }

    function success(contentHook: string, templateData?: Any) {
        let content = '';
        if (templateData) {
            content = render(templateData);
            $('.popover-content').html(content);
        }
        return function (response) {
            if (!response) {
                error('response is null');
                return;
            }
            currentRequest = null;
            if (response && response.length == 0)
                content = emptyTemplate();
            else
                content = render(response);
            $('.popover-content').html(content)
        }
    }

    function error(contentHook: string) {
        if (contentHook === 'response is null') {
            let content = failTemplate();
            $('.popover-content').html(content);
            return;
        }
        return function (response) {
            currentRequest = null;
            if (response.statusText != "abort") {
                let content = failTemplate();
                $('.popover-content').html(content)
            }
        }
    }
}

export function Popover() {
    let instance;

    function createInstance() {
        return {
            init: init,
            selectors: selectors
        };
    }

    if (!instance) {
        instance = createInstance();
    }

    return instance;
}
