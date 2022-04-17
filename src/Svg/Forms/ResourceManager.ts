import { NotImplementedException } from '@tuval/core';
export class ResourceManager {
    public /* virtual */ getString(name: string): string {
        throw new NotImplementedException('ResourceManager::getString');
    }
    public /* virtual */ getObject(name: string): string {
        throw new NotImplementedException('ResourceManager::getString');
    }
}