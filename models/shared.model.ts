export declare interface RequestTableParams {
    perPage: number;
    page: number;
    orderBy: string;
    orderingDirection: string;
}


export declare interface MainMenuPoint {
    iconActive: string;
    iconInActive?: string;
    title: string;
    angularRoute: string;
    outsideRoute: string;
    isAngular: boolean;
    isOutside: boolean;
    level2?: boolean;
    topMenuChild?: Level2MenuPoint[];
    bottomMenuChild?: Level2MenuPoint[];
    queryParams?: any;
}

export declare interface Level2MenuPoint {
    icon: string;
    title: string;
    url: string;
    isAngular: boolean;
    addBtn?: boolean; //Does it need plus button?
    addBtnTooltip?: string; //Custom tooltip?
    addFunction?: true; //Plus button is function?
    addFunctionType?: string; //if yes, what type of function
    addRoute?: string; //if not a function, use route,
    child?: any;
}

