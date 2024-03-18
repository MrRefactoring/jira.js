import { RendererComponent } from "../components";
/**
 * Plugin which is responsible for creating an icons.js file that embeds the icon SVGs
 * within the page on page load to reduce page sizes.
 */
export declare class IconsPlugin extends RendererComponent {
    iconHtml?: string;
    initialize(): void;
    private onBeginRender;
    private onRenderEnd;
}
