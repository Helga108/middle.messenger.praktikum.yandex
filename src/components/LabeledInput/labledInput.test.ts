import { expect } from 'chai';
import LabeledInput from './labeledInput';

describe('Labled input', ()=>{
    it("should render", ()=>{
        new LabeledInput({name: 'test', label: 'test', type: 'text', value: ''})
    })

    it('element should return div', () => {
        const input = new LabeledInput({name: 'test', label: 'test', type: 'text', value: ''});
        const element = input.element;
    
        expect(element).to.be.instanceof(window.HTMLDivElement)
      });
})