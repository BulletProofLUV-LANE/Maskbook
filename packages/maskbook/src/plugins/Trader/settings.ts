import stringify from 'json-stable-stringify'
import { createInternalSettings, createGlobalSettings } from '../../settings/createSettings'
import { DataProvider, ZrxTradePool, TradeProvider } from './types'
import { DEFAULT_SLIPPAGE_TOLERANCE, PLUGIN_IDENTIFIER } from './constants'
import { i18n } from '../../utils/i18n-next'
import { unreachable } from '../../utils/utils'
import { getEnumAsArray } from '../../utils/enum'

/**
 * The slippage tolerance of trader
 */
export const currentSlippageTolerance = createGlobalSettings<number>(
    `${PLUGIN_IDENTIFIER}+slippageTolerance`,
    DEFAULT_SLIPPAGE_TOLERANCE,
    {
        primary: () => '',
    },
)

/**
 * The default data provider
 */
export const currentDataProviderSettings = createGlobalSettings<DataProvider>(
    `${PLUGIN_IDENTIFIER}+dataProvider`,
    DataProvider.COIN_MARKET_CAP,
    {
        primary: () => i18n.t('plugin_trader_settings_data_source_primary'),
        secondary: () => i18n.t('plugin_trader_settings_data_source_secondary'),
    },
)

/**
 * The default trader provider
 */
export const currentTradeProviderSettings = createGlobalSettings<TradeProvider>(
    `${PLUGIN_IDENTIFIER}+tradeProvider`,
    TradeProvider.UNISWAP,
    {
        primary: () => i18n.t('plugin_trader_settings_trade_provider_primary'),
        secondary: () => i18n.t('plugin_trader_settings_trade_provider_secondary'),
    },
)

//#region trade provider general settings
export interface TradeProviderSettings {
    pools: ZrxTradePool[]
}

const uniswapSettings = createInternalSettings<string>(`${PLUGIN_IDENTIFIER}+tradeProvider+uniswap`, '')
const zrxSettings = createInternalSettings<string>(
    `${PLUGIN_IDENTIFIER}+tradeProvider+zrx`,
    stringify({
        pools: getEnumAsArray(ZrxTradePool).map((x) => x.value),
    }),
)

/**
 * The general settings of specific tarde provider
 */
export function getCurrentTradeProviderGeneralSettings(tradeProvider: TradeProvider) {
    switch (tradeProvider) {
        case TradeProvider.UNISWAP:
            return uniswapSettings
        case TradeProvider.ZRX:
            return zrxSettings
        default:
            unreachable(tradeProvider)
    }
}
//#endregion

//#region data provider general settings
const coinGeckoSettings = createInternalSettings(`${PLUGIN_IDENTIFIER}+currentCoinGeckoSettings`, '')
const coinMarketCapSettings = createInternalSettings(`${PLUGIN_IDENTIFIER}+currentCoinMarketCapSettings`, '')

/**
 * The general settings of specific data provider
 */
export function getCurrentDataProviderGeneralSettings(dataProvider: DataProvider) {
    switch (dataProvider) {
        case DataProvider.COIN_GECKO:
            return coinGeckoSettings
        case DataProvider.COIN_MARKET_CAP:
            return coinMarketCapSettings
        default:
            unreachable(dataProvider)
    }
}
//#endregion
