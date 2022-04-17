import { TuChangedEventArgs } from './TuChangedEventArgs';
import { Delegate } from '@tuval/core';
export  class TuChangedEventHandler extends Delegate<(sender: any, e: TuChangedEventArgs) => void> {
}