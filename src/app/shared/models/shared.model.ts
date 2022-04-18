import { formValues } from './formValues.model';


export class Shared extends formValues {
    public isSelected: boolean;
    constructor(object: formValues){
        super(object);
        this.isSelected = false;
    }
}
