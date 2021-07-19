// This interface is the anti corruption layer between kernel and website

import type { Observable } from "mz-observable"
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
export interface KernelRendererVisibleEvent {
  visible: boolean
  loadingScreen: boolean
}

/**
 * @public
 */
export type KernelOptions = {
  container: any
  kernelOptions: {
    version: string
    baseUrl: string
  }
  rendererOptions: {
    version: string
    baseUrl: string
  }
}

/**
 * @public
 */
export type KernelResult = {
  signUpObservable: Observable<KernelSignUpEvent>
  accountStateObservable: Observable<KernelAccountState>
  loadingProgressObservable: Observable<KernelLoadingProgress>
  errorObservable: Observable<KernelError>
  trackingEventObservable: Observable<KernelTrackingEvent>
  rendererVisibleObservable: Observable<KernelRendererVisibleEvent>
  authenticate(provider: IEthereumProvider, isGuest: boolean): void
  version: string
}

/**
 * @public
 */
export interface IDecentralandKernel {
  initKernel(options: KernelOptions): Promise<KernelResult>
}
