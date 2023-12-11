import { Int } from "@keplr-wallet/unit";
import { AxiosInstance } from "axios";
export interface Account {
    getType(): string;
    getAddress(): string;
    getAccountNumber(): Int;
    getSequence(): Int;
}
export declare class BaseAccount implements Account {
    protected readonly type: string;
    protected readonly address: string;
    protected readonly accountNumber: Int;
    protected readonly sequence: Int;
    static fetchFromRest(instance: AxiosInstance, address: string, defaultBech32Address?: boolean): Promise<BaseAccount>;
    static fromProtoJSON(obj: {
        account?: any;
    }, defaultBech32Address?: string): BaseAccount;
    constructor(type: string, address: string, accountNumber: Int, sequence: Int);
    getType(): string;
    getAddress(): string;
    getAccountNumber(): Int;
    getSequence(): Int;
}
