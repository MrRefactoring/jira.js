import { RendererComponent } from "../components";
export declare class SitemapPlugin extends RendererComponent {
    accessor sitemapBaseUrl: string;
    initialize(): void;
    private onRendererBegin;
    private buildSitemap;
}
