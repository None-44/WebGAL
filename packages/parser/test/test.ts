import SceneParser from "../index";
import { ADD_NEXT_ARG_LIST, SCRIPT_CONFIG } from "../config/scriptConfig";

const parser = new SceneParser((assetList) => {
}, (fileName, assetType) => {
  return fileName;
}, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

const result = parser.parse(`
; 初始场景，以及特效演示
changeBg:c4.jpg -next;
unlockCg:c4.jpg -name=街前;  解锁部分CG
unlockCg:xgmain.jpeg -name=星光咖啡馆与死神之蝶;
unlockBgm:s_Title.mp3 -name=Smiling-Swinging!!;
WebGAL:特效系统是3.9.2版本新引入的系统，你想要看特效的演示吗？;
choose:观看特效演示:demo|我不要看特效，直接来吧！:toStart;
label:demo;
pixiInit;
pixiPerform:rain;
WebGAL:现在展示的是下雨的特效。;
pixiInit;
pixiPerform:snow;
WebGAL:现在展示的是下雪的特效。;
setTextbox:hide;
pixiInit;
setTextbox:on -next;
WebGAL:特效的演示已经结束，现在我们正式开始吧！;

; 正式场景
label:toStart;
playVideo:OP.mp4;
changeBg:c3.jpg -next;
unlockCg:c3.jpg -name=cafe;
changeFigure:m2.png -left -next;
bgm:cb1.mp3;
unlockBgm:cb1.mp3 -name=ひとすじの光明;
setAnimation:enter-from-left -target=fig-left -next;
米咖多:蛋包饭是栞那做的，但红茶是夏目泡的。 -v1.ogg;
昂晴:......;
顺便问一下，你是打算做什么的？;
changeFigure:m1.png -left -next;
米咖多:就是倒饮料。然后咖啡和红茶的冲泡方式我还是记住了的。 -v2.ogg;
昂晴:这、这样么......;
:这猫爪子真的能泡茶么。;
拿得了水壶吗？就凭他那个肉球爪子......;
难道这些也是凭借猫妖的奇特力量做到的吗？;
changeFigure:none -left -next;
changeFigure:k1.png -next;
setAnimation:enter-from-bottom -target=fig-center -next;
栞那:那么，你想先尝哪个？ -v3.ogg;
choose:品尝蛋包饭:dbf|品尝红茶:hc;

; 栞那选项
label:dbf;
昂晴:总之，先确认下蛋包饭的味道吧;
changeFigure:k2.png -next;
栞那:明白了，交给我吧 -v4.ogg;
changeFigure:none -next;
changeFigure:m2.png -left -next;
changeFigure:k3.png -right -next;
setAnimation:enter-from-left -target=fig-left -next;
setAnimation:enter-from-right -target=fig-right -next;
栞那:那么米咖多先生，我去做一下试作品 -v5.ogg;
米咖多:嗯。去吧 -v6.ogg;
changeFigure:none -left -next;
changeFigure:none -right -next;
changeFigure:k4.png -next;
setAnimation:enter-from-bottom -target=fig-center -next;
栞那:那么高岭同学，我们移动到厨房吧 -v7.ogg;
changeFigure:none -next;
bgm:cb2.mp3;
unlockBgm:cb2.mp3 -name=Tea Break;
changeBg:c2.jpg;
unlockCg:c2.jpg -name=厨房;
changeFigure:k2.png -next;
栞那:话不多说开始做吧 -v8.ogg;
jumpLabel:end;

; 夏目选项
label:hc;
changeFigure:none -next;
changeFigure:m1.png -left -next;
changeFigure:k1.png -right -next;
setAnimation:enter-from-left -target=fig-left -next;
setAnimation:enter-from-right -target=fig-right -next;
米咖多:那么就是，夏目了吧 -v9.ogg;
changeFigure:k6.png -right -next;
栞那:她刚去休息，要不要我叫回来呢？ -v10.ogg;
昂晴:没事，我自己去吧;
changeFigure:none -left -next;
changeFigure:none -right -next;
bgm:cb2.mp3;
changeBg:c1.jpg -next;
unlockCg:c1.jpg -name=休息室;
:我先敲了敲门;
miniAvatar:n1.png;
夏目:哪位？ -v11.ogg;
昂晴:我是高岭，可以进去吗？;
夏目:可以，没问题 -v12.ogg;
昂晴:打搅了;
miniAvatar:none;
changeFigure:n4.png -next;
昂晴:打搅你休息了;
夏目:不用在意，怎么了？ -v13.ogg;
changeFigure:n2.png -next;
:她并没有无精打采，比想象中精神多了;
昂晴:问道拿手菜谱，就听说四季同学泡的红茶味道不错，我也想品尝一下;
夏目:明白了，那我们回去吧 -v14.ogg;
jumpLabel:end;

; 结束场景
label:end;
changeFigure:none -next;
WebGAL:基础演出的展示已经结束。;
`, "test", "/test.txt");

console.log(result);
