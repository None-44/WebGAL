import axios from 'axios';
import { logger } from '../logger';
import { assetSetter, fileType } from '../gameAssetsAccess/assetSetter';
import { getStorage, setStorage } from '../../controller/storage/storageController';
import { webgalStore } from '@/store/store';
import { setGuiAsset, setLogoImage } from '@/store/GUIReducer';
import { setEbg } from '@/Core/gameScripts/changeBg/setEbg';
import { initKey } from '@/Core/controller/storage/fastSaveLoad';
import { WebgalParser } from '@/Core/parser/sceneParser';
import { WebGAL } from '@/Core/WebGAL';
import { getFastSaveFromStorage, getSavesFromStorage } from '@/Core/controller/storage/savesController';
import { resetUserData, setGlobalVar } from '@/store/userDataReducer';
import localforage from 'localforage';
import { IUserData } from '@/store/userDataInterface';

declare global {
  interface Window {
    renderPromise?: Function;
  }
}
/**
 * 获取游戏信息
 * @param url 游戏信息路径
 */
export const infoFetcher = (url: string) => {
  getStorage();
  const GUIState = webgalStore.getState().GUI;
  const dispatch = webgalStore.dispatch;
  axios.get(url).then((r) => {
    let gameConfigRaw: string = r.data;
    let gameConfig = WebgalParser.parseConfig(gameConfigRaw);
    logger.info('获取到游戏信息', gameConfig);
    // 按照游戏的配置开始设置对应的状态
    if (GUIState) {
      gameConfig.forEach((e) => {
        const { command, args } = e;
        switch (command) {
          case 'Title_img': {
            const titleUrl = assetSetter(args.join(''), fileType.background);
            dispatch(setGuiAsset({ asset: 'titleBg', value: titleUrl }));
            setEbg(titleUrl);
            break;
          }

          case 'Game_Logo': {
            // eslint-disable-next-line max-nested-callbacks
            const logoUrlList = args.map((url) => assetSetter(url, fileType.background));
            dispatch(setLogoImage(logoUrlList));
            break;
          }

          case 'Title_bgm': {
            const bgmUrl = assetSetter(args[0], fileType.bgm);
            dispatch(setGuiAsset({ asset: 'titleBgm', value: bgmUrl }));
            break;
          }

          case 'Game_name': {
            WebGAL.gameName = args[0];
            document.title = args[0];
            break;
          }

          case 'Game_key': {
            WebGAL.gameKey = args[0];
            getStorage();
            getFastSaveFromStorage();
            getSavesFromStorage(0, 0);
            break;
          }
        }
        let res: any = args[0].trim();
        if (/^(true|false)$/g.test(args[0])) {
          res = !!(res === 'true');
        } else if (/^[0-9]+\.?[0-9]+$/g.test(args[0])) {
          res = Number(res);
        }
        dispatch(
          setGlobalVar({
            key: command,
            value: res,
          }),
        );
      });
    }
    window?.renderPromise?.();
    delete window.renderPromise;
    initKey();
    setTimeout(() => {
      setStorage();
    }, 200);
  });
};
