type PairType = {
    [key: string]: any
}

export interface LinkProps extends BasicLinkProps, PairType {
    last_modified: string,
    mobile_target: string | null,
    status_code: number | null,
}

export interface BasicLinkProps {
    name: string,
    desc: string,
    target: string,
    active: boolean,
    allow_parameters: boolean,
}