import { Delegate } from '@tuval/core';
import { EventArgs } from "./EventArgs";

export class EventHandler<T> extends Delegate<(args: T) => void> { }