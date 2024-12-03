//Request States
//Loading
//Error
//Success

export abstract class Resource{constructor() {}}
export function Loading(): Resource{return {}}
export function Success(data: any): Resource{return {data}}
export function Err(error: string): Resource{return {error}}