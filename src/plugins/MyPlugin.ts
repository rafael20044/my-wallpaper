import { registerPlugin } from '@capacitor/core';

interface IData{
    execute: (option: {imgUrl: string; target?: 'home' | 'lock' | 'both'}) => Promise<{isOk:boolean}>
}

const myPlugin = registerPlugin<IData>('MyPlugin');

export default myPlugin;