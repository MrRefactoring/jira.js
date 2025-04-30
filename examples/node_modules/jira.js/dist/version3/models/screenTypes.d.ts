/** The IDs of the screens for the screen types of the screen scheme. */
export interface ScreenTypes {
    /** The ID of the edit screen. */
    edit?: number;
    /** The ID of the create screen. */
    create?: number;
    /** The ID of the view screen. */
    view?: number;
    /** The ID of the default screen. Required when creating a screen scheme. */
    default?: number;
}
