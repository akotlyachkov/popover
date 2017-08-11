import * as $ from "jquery";
import * as imgageTemplate from "./templates/img.html";
import * as iconsTemplate from "./templates/icons.html";
import {Popover} from "./popover";
import {randomInteger} from "./random";
import {isUndefined} from "util";

interface IOptionsPlugin {
    iconPath: string;
    iconExt: string;
    iconHook?: string;
    customClass?: string;
    position?: string;
    url?: string;
    popover: boolean;
}

interface IOptionsIcons {
    orgid?: number;
    orgId?: number;
    popover: boolean;
    icons: string[];
    iconPath: string;
    position?: string;
    customClass?: string;
    profiles?: Array<Object>;
}

export function icons(selector: string, options: IOptionsPlugin): void {
    options = options || {};

    if (!jQuery) throw new Error('Необходимо предварительно подключить jQuery.js');
    if (!selector) throw new Error('Необходимо указать селектор элемента, около которого нужно показать социальные иконки');
    if (!options.iconPath)throw new Error('Необходимо указать options.iconPath - путь для социальной иконки');
    if (!options.iconExt)throw new Error('Необходимо указать options.iconExt - расширение файла социальной иконки');

    let $selector = $(selector);

    $selector.toArray().forEach(function (el) {
        let randId = randomInteger(10000, 99999);
        let $el = $(el),
            data: IOptionsIcons = $el.data('options') || {},
            orgid = Number(data.orgid) || Number(data.orgId),
            profiles = data.profiles || null,
            iconHook = options.iconHook || `.js-social-icons-${randId}`,
            position = data.position || options.position || 'right',
            initPopover = !isUndefined(data.popover) ? data.popover : !isUndefined(options.popover) ? options.popover : false,
            pointer = initPopover ? 'pointer' : '',
            customClass = data.customClass || options.customClass || '',
            icons = data.icons || [],
            initIcons = icons.length > 0,
            images = [];

        icons = Array.from(new Set(icons));

        if (initIcons) {
            if (!$el.hasClass('js-social-icons-inited')) {

                icons.forEach(function (icon) {
                    let iconPath = options.iconPath + icon + '.' + options.iconExt,
                        image = imgageTemplate({iconPath});
                    images.push(image);
                });

                let imagesTemplate = images.join('\n'),
                    template = iconsTemplate({
                        icons: imagesTemplate,
                        iconHook: iconHook.replace(/\./g, ''),
                        options: JSON.stringify({"orgid": orgid}),
                        profile: JSON.stringify({"profiles": profiles}),
                        pointer,
                        customClass
                    });

                switch (position) {
                    case 'right':
                        $el.after(template);
                        break;
                    case 'left':
                        $el.before(template);
                        break;
                    case 'inside':
                        $el.html(template);
                        break;
                    default:
                        throw new Error('Неправильное значение options.position, допустимо "right" или "left"');
                }

                if (initPopover) {
                    if (!options.url) throw new Error('Необходимо указать options.url - ссылку на api');

                    let popover = Popover();
                    popover.init(iconHook, options);
                }
                $el.addClass('js-social-icons-inited');
            }
        }
    });
}