import { expect } from "chai"
import {set} from './helpers';

describe('test function', ()=>{
    
    const keypath = 'test';
    const value = 'value';

    let obj: Record<string, unknown>;

    beforeEach(()=>{
        obj = {};
    })
    it('should set a value by keypath', ()=>{
        //arrange

        //act
        set(obj, keypath, value);
        //assert
        expect(obj).to.haveOwnProperty(keypath, value);
    })

    it('should return original object', ()=>{

        const result: any= set(obj, keypath, value);

        result.test1 = 'value2';

        expect(result).to.eq(obj)
    })

    it('should return original object if it is not of type object', ()=>{
        const objNotObj = 'test';
        const result = set(objNotObj, keypath, value);

        expect(result).to.eq(objNotObj)
    })

    it('should throw an error if keypath is not string', ()=>{
        const keypathNotString = 1;
        //@ts-ignore because we want to check behaviour in runtime
        const f = () => set(obj, keypathNotString, value);

        expect(f).to.throw(Error)
    })
})