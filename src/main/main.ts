export interface Main {
    accountList: Array<Account>
}

export interface Account {
    name: string,
    code: string,
    owner: string
}