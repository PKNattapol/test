export abstract class Static {
    public static serverUrl = 'https://app.petsline.store/workflowsapp/showroomlive/';

    public static getServerUrl(): string {
        return this.serverUrl;
    }
}