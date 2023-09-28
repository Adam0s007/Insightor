
export class Socials{
    constructor(
        public twitter:string = null,
        public facebook:string = null,
        public youtube:string = null,
        public instagram:string = null,
        public linkedin:string = null,
    ){}
}

export interface SocialsDTO {
    twitter?:string;
    facebook?:string;
    youtube?:string;
    instagram?:string;
    linkedin?:string;
}
