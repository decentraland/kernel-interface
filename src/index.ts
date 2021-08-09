// This interface is the anti corruption layer between kernel and website

import { AuthIdentity } from "./dcl-crypto"

export { AuthIdentity }

/**
 * @public
 */
export type IEthereumProvider = { sendAsync: any } | { request: any }

/**
 * @public
 */
export interface KernelTrackingEvent {
  eventName: string
  eventData: Record<string, any>
}

/**
 * @public
 */
export interface KernelError {
  error: Error
  code?: string
  level?: "critical" | "fatal"
  extra?: Record<string, any>
}

/**
 * @public
 */
export interface KernelLoadingProgress {
  progress: number
  status?: number
}

/**
 * @public
 */
export enum LoginState {
  LOADING = "LOADING",
  WAITING_PROVIDER = "WAITING_PROVIDER",
  SIGNATURE_PENDING = "SIGNATURE_PENDING",
  SIGNATURE_FAILED = "SIGNATURE_FAILED",
  /**
   * Creating avatar. Before signing ToS
   */
  SIGN_UP = "SIGN_UP",
  WAITING_PROFILE = "WAITING_PROFILE",
  COMPLETED = "COMPLETED",
}

/**
 * @public
 */
export type DecentralandIdentity = AuthIdentity & {
  address: string // contains the lowercased address that will be used for the userId
  rawAddress: string // contains the real ethereum address of the current user
  provider?: any
  hasConnectedWeb3: boolean
}

/**
 * @public
 */
export interface KernelAccountState {
  loginStatus: LoginState
  network?: string
  identity?: DecentralandIdentity
  hasProvider: boolean
}

/**
 * @public
 */
export interface KernelSignUpEvent {
  email: string
}

/**
 * @public
 */
export interface KernelOpenUrlEvent {
  url: string
}

/**
 * @public
 */
export interface KernelRendererVisibleEvent {
  visible: boolean
}

/**
 * @public
 */
export type KernelOptions = {
  kernelOptions: {
    baseUrl?: string
    previewMode?: boolean
    configurations?: Record<string, string>
  }
  rendererOptions: {
    container: any
    baseUrl?: string
  }
}

/**
 * @public
 */
export type NamedEvents = {
  signUp: KernelSignUpEvent
  accountState: KernelAccountState
  loadingProgress: KernelLoadingProgress
  error: KernelError
  trackingEvent: KernelTrackingEvent
  rendererVisible: KernelRendererVisibleEvent
  openUrl: KernelOpenUrlEvent
}

/**
 * @public
 */
export type KernelResult = {
  on<K extends keyof NamedEvents>(eventName: K, cb: (event: NamedEvents) => void): void
  on(eventName: string, cb: (event: Record<string, any>) => void): void
  authenticate(provider: IEthereumProvider, isGuest: boolean): void
  version: string
}

/**
 * @public
 */
export interface IDecentralandKernel {
  initKernel(options: KernelOptions): Promise<KernelResult>
}
