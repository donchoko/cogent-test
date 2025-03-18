export interface Review {
    created_at: string;
    text: string;
}

export interface Place {
    fsq_id: string;
    name: string;
    description: string;
    tel: string;
    categories: {
        id: number;
        name: string;
        short_name: string;
        plural_name: string;
        icon: {
            prefix: string;
            suffix: string;
        };
    }[];
    closed_bucket: string;
    distance: number;
    geocodes: {
        drop_off?: {
            latitude: number;
            longitude: number;
        };
        main: {
            latitude: number;
            longitude: number;
        };
    };
    hours?: {
        display: string;
        is_local_holiday: boolean;
        open_now: boolean;
    };
    link: string;
    location: {
        address: string;
        country: string;
        cross_street?: string;
        formatted_address: string;
        locality: string;
        region: string;
    };
    photos?: {
        id: string;
        created_at: string;
        prefix: string;
        suffix: string;
        width: number;
        height: number;
    }[];
    social_media?: {
        facebook_id: string;
        instagram: string;
        twitter: string;
    };
    website: string;
    tips: Review[];
    rating: number;
}
