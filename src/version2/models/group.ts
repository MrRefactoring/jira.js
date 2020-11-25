export interface Group {
    /**The name of group.*/
    name?: string;
    /**The URL for these group details.*/
    self?: string;
    /**A paginated list of the users that are members of the group. A maximum of 50 users is returned in the list, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 50 users, use`?expand=users[51:100]`.*/
    users?: PagedListUserDetailsApplicationUser[];
    /**Expand options that include additional group details in the response.*/
    expand?: string;
}