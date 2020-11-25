/**Details of a dashboard.*/
export interface Dashboard {
    description?: string;
    /**The ID of the dashboard.*/
    id?: string;
    /**Whether the dashboard is selected as a favorite by the user.*/
    isFavourite?: boolean;
    /**The name of the dashboard.*/
    name?: string;
    /**The owner of the dashboard.*/
    owner?: UserBean[];
    /**The number of users who have this dashboard as a favorite.*/
    popularity?: number;
    /**The rank of this dashboard.*/
    rank?: number;
    /**The URL of these dashboard details.*/
    self?: string;
    /**The details of any share permissions for the dashboard.*/
    sharePermissions?: SharePermission[];
    /**The URL of the dashboard.*/
    view?: string;
}