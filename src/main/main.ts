export interface Main {
    accountList: Array<Account>
}

export interface Account {
    name: string,
    accessCode: string,
    issuer: string,
    epoch: number,
    algorithm: string
}