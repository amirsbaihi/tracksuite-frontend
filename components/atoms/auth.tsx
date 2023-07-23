import { atomWithStorage } from 'jotai/utils'

export const authDefault = {isLoggedIn:false, jwt:"", userId:"", email:""}
export const authAtom = atomWithStorage('authAtom', authDefault)