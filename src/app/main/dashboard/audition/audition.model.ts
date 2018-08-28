import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Audition
{
    id: string;
    showroom_id: string;
    name: string;
    handle: string;
    email: string
    tel: string;
    line_id: string;
    custom01: string;
    custom02: string;
    custom03: string;
    images: {
        id: string,
        url: string,
        type: string
    }[];

    /**
     * Constructor
     *
     * @param audition
     */
    constructor(audition?)
    {
        audition = audition || {};
        this.id = audition.id || FuseUtils.generateGUID();
        this.showroom_id = audition.showroom_id || '';
        this.name = audition.name || '';
        this.handle = audition.handle || FuseUtils.handleize(this.name);
        this.email = audition.email || '';
        this.tel = audition.tel || '',
        this.line_id = audition.line_id || '',
        this.custom01 = audition.custom01 || '',
        this.custom02 = audition.custom02 || '',
        this.custom03 = audition.custom03 || '',
        this.images = audition.custom03 || []
    }
}