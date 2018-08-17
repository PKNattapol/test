import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Audition
{
    id: string;
    name: string;
    handle: string;
    description: string;
    custom01: string;
    custom02: string;
    custom03: string;
    image: any;

    /**
     * Constructor
     *
     * @param audition
     */
    constructor(audition?)
    {
        audition = audition || {};
        this.id = audition.id || FuseUtils.generateGUID();
        this.name = audition.name || '';
        this.handle = audition.handle || FuseUtils.handleize(this.name);
        this.description = audition.description || '',
        this.custom01 = audition.custom01 || '',
        this.custom02 = audition.custom02 || '',
        this.custom03 = audition.custom03 || '',
        this.image = audition.custom03 || ''
    }
}