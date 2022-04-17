export class CancelEventArgs {
    public Cancel: boolean = false;
    public constructor(cancel?: boolean) {
        if (cancel !== undefined) {
            this.Cancel = cancel;
        }

    }
}