import { Graphics, ColorMatrix, SolidBrush, GraphicTypes, ImageAttributes, Icon, Image, GraphicsUnit } from '@tuval/graphics';
import { TuChangedEventArgs } from './../TuChangedEventArgs';
import { TuImageEvents } from './TuImageEvents';
import { CGImage, CGPoint, CoreGraphicTypes, CGRectangle, CGSize, CGColor } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, Dictionary, List, foreach, IKeyValuePair, CONTINUE, as, MemoryStream, Out, New } from '@tuval/core';

import { TuImageInfo } from './TuImageInfo';
import { Spot, TopLeft } from '../Spot';
import { ResourceManager } from '../Forms/ResourceManager';
import { NullRect } from '../Globals';
import { TuView } from '../TuView/TuView';
import { TuObject } from '../TuObject/TuObject';

const flagAutoResizes: number = 1048576;
const flagThrowsExceptions: number = 2097152;
const flagExceptionTraced: number = 4194304;
const flagNameIsUri: number = 8388608;

type ImageList = any;
@ClassInfo({
    fullName: Types.TuImage,
    instanceof: [
        Types.TuImage
    ]
})
export class TuImage extends TuObject {

    private static myInfo: TuImageInfo;
    private static myImages: Dictionary<TuImageInfo, any>;
    private static myCounter: number;
    private static myDefaultImageList: ImageList;
    private static myDefaultResourceManager: ResourceManager;
    private myAlignment: Spot = TopLeft;
    private myResourceManager: ResourceManager = TuImage.DefaultResourceManager;
    private myName: string;
    private myImageList: ImageList = TuImage.DefaultImageList;
    private myIndex: number = -1;
    private myImage: CGImage;

    //#region [Property] Alignment
    public get Alignment(): Spot {
        return this.getAlignment();
    }
    public set Alignment(value: Spot) {
        this.setAlignment(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getAlignment(): Spot {
        return this.myAlignment;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setAlignment(value: Spot) {
        const int32: Spot = this.myAlignment;
        if (int32 !== value) {
            this.myAlignment = value;
            this.Changed(TuImageEvents.ChangedAlignment, 0, int32, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AutoResizes
    public get AutoResizes(): boolean {
        return this.getAutoResizes();
    }
    public set AutoResizes(value: boolean) {
        this.setAutoResizes(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getAutoResizes(): boolean {
        return (this.InternalFlags & flagAutoResizes) !== 0;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setAutoResizes(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagAutoResizes) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagAutoResizes;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagAutoResizes;
            }
            this.Changed(TuImageEvents.ChangedAutoResizes, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AutoResizes
    public static get DefaultImageList(): ImageList {
        return TuImage.myDefaultImageList;
    }
    public set DefaultImageList(value: ImageList) {
        TuImage.myDefaultImageList = value;
    }
    //#endregion

    //#region [Property] DefaultResourceManager
    public static get DefaultResourceManager(): ResourceManager {
        return TuImage.myDefaultResourceManager;
    }
    public set DefaultResourceManager(value: ResourceManager) {
        TuImage.myDefaultResourceManager = value;
    }
    //#endregion

    //#region [Property] Image
    public get Image(): CGImage {
        return this.getImage();
    }
    public set Image(value: CGImage) {
        this.setImage(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getImage(): CGImage {
        if (this.myImage == null) {
            this.myImage = this.loadImage();
        }
        return this.myImage;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setImage(value: CGImage) {
        if (this.myImage == null) {
            this.myImage = this.loadImage();
        }
        const image: CGImage = this.myImage;
        if (image != value) {
            this.myImage = value;
            this.Changed(TuImageEvents.ChangedImage, 0, image, NullRect, 0, value, NullRect);
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] ImageList
    public get ImageList(): ImageList {
        return this.getImageList();
    }
    public set ImageList(value: ImageList) {
        this.setImageList(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getImageList(): ImageList {
        return this.myImageList;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setImageList(value: ImageList) {
        const imageList: ImageList = this.myImageList;
        if (imageList !== value) {
            this.myImageList = value;
            this.resetImage();
            this.Changed(TuImageEvents.ChangedImageList, 0, imageList, NullRect, 0, value, NullRect);
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] Index
    public get Index(): number {
        return this.getIndex();
    }
    public set Index(value: number) {
        this.setIndex(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getIndex(): number {
        return this.myIndex;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setIndex(value: number) {
        const int32: number = this.myIndex;
        if (int32 !== value) {
            this.myIndex = value;
            this.resetImage();
            this.Changed(TuImageEvents.ChangedIndex, int32, undefined, NullRect, value, undefined, NullRect);
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] Location

    /**
     * @hidden
     */
    protected /*virtual*/ getLocation(): CGPoint {
        return this.GetSpotLocation(this.Alignment);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setLocation(value: CGPoint) {
        this.setSpotLocation(this.Alignment, value);
    }
    //#endregion

    //#region [Property] Name
    public get Name(): string {
        return this.getName();
    }
    public set Name(value: string) {
        this.setName(value);
    }

    /**
     * @hidden
     */
    public /*virtual*/ getName(): string {
        return this.myName;
    }

    /**
     * @hidden
     * @param style
     */
    public /*virtual*/ setName(value: string): TuImage {
        const str: string = this.myName;
        if (str != value) {
            this.myName = value;
            this.resetImage();
            this.Changed(TuImageEvents.ChangedName, 0, str, NullRect, 0, value, NullRect);
            this.updateSize();
        }
        return this;
    }
    //#endregion

    //#region [Property] NameIsUri
    public get NameIsUri(): boolean {
        return this.getNameIsUri();
    }
    public set NameIsUri(value: boolean) {
        this.setNameIsUri(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNameIsUri(): boolean {
        return (this.InternalFlags & flagNameIsUri) != 0;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNameIsUri(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagNameIsUri) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagNameIsUri;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagNameIsUri;
            }
            this.resetImage();
            this.Changed(TuImageEvents.ChangedNameIsUri, 0, internalFlags, NullRect, 0, value, NullRect);
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] ResourceManager
    public get ResourceManager(): ResourceManager {
        return this.getResourceManager();
    }
    public set ResourceManager(value: ResourceManager) {
        this.setResourceManager(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getResourceManager(): ResourceManager {
        return this.myResourceManager;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setResourceManager(value: ResourceManager) {
        const resourceManager: ResourceManager = this.myResourceManager;
        if (resourceManager !== value) {
            this.myResourceManager = value;
            this.resetImage();
            this.Changed(TuImageEvents.ChangedResourceManager, 0, resourceManager, NullRect, 0, value, NullRect);
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] ThrowsExceptions
    public get ThrowsExceptions(): boolean {
        return this.getThrowsExceptions();
    }
    public set ThrowsExceptions(value: boolean) {
        this.setThrowsExceptions(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getThrowsExceptions(): boolean {
        return (this.InternalFlags & flagThrowsExceptions) !== 0;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setThrowsExceptions(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagThrowsExceptions) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagThrowsExceptions;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagThrowsExceptions;
            }
            this.Changed(TuImageEvents.ChangedThrowsExceptions, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion


    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuImageEvents.ChangedImage:
                {
                    this.Image = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedResourceManager:
                {
                    this.ResourceManager = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedName:
                {
                    this.Name = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedAlignment:
                {
                    this.Alignment = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedAutoResizes:
                {
                    this.AutoResizes = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedImageList:
                {
                    this.ImageList = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedIndex:
                {
                    this.Index = e.getInt(undo);
                    return;
                }
            case TuImageEvents.ChangedThrowsExceptions:
                {
                    this.ThrowsExceptions = e.getValue(undo);
                    return;
                }
            case TuImageEvents.ChangedNameIsUri:
                {
                    this.NameIsUri = e.getValue(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    private static CleanInfos(): number {
        const int32: number = TuImage.myCounter;
        TuImage.myCounter = int32 + 1;
        if (int32 < 100) {
            return TuImage.myImages.Count;
        }
        TuImage.myCounter = 0;
        const goImageInfos: List<TuImageInfo> = new List<TuImageInfo>();
        foreach(TuImage.myImages, (myImage: IKeyValuePair<TuImageInfo, any>) => {
            if (myImage.value) {
                return CONTINUE;
            }
            goImageInfos.Add(myImage.key);
        });

        foreach(goImageInfos, (goImageInfo: TuImageInfo) => {
            TuImage.myImages.Remove(goImageInfo);
        });

        return TuImage.myImages.Count;
    }

    public static clearCachedImage(path: string): void;
    public static clearCachedImage(resmgr: ResourceManager, name: string): void;
    public static clearCachedImage(...args: any[]): void {
        if (args.length === 1) {
            const path: string = args[0];

            TuImage.myInfo.Source = undefined;
            TuImage.myInfo.Index = 0;
            TuImage.myInfo.Name = path;
            // TuImage.myInfo.Culture = CultureInfo.InvariantCulture;
            TuImage.myImages.Remove(TuImage.myInfo);
        } else if (args.length === 2) {
            const resmgr: ResourceManager = args[0];
            const name: string = args[1];
            if (resmgr == null) {
                return;
            }
            if (name == null) {
                const goImageInfos: List<TuImageInfo> = new List<TuImageInfo>();
                foreach(TuImage.myImages, (myImage: IKeyValuePair<TuImageInfo, any>) => {
                    const key: TuImageInfo = myImage.key;
                    if (key.Source !== resmgr) {
                        return CONTINUE;
                    }
                    goImageInfos.Add(key);
                });

                foreach(goImageInfos, (goImageInfo: TuImageInfo) => {
                    TuImage.myImages.Remove(goImageInfo);
                });
            }
            else {
                TuImage.myInfo.Source = resmgr;
                TuImage.myInfo.Index = 0;
                TuImage.myInfo.Name = name;
                TuImage.myImages.Remove(TuImage.myInfo);
            }
        }
    }



    public static clearCachedImages(): void {
        TuImage.myImages.Clear();
    }

    private static convertIconToImage(icon: Icon): CGImage {
        return icon.toBitmap();
    }

    private convertObjectToImage(obj: any): CGImage {
        if (obj == null) {
            return undefined;
        }
        const image: CGImage = as(obj, CoreGraphicTypes.CGImage);
        if (image != null) {
            return image;
        }
        const icon: Icon = as(obj, GraphicTypes.Icon);
        if (icon != null) {
            return TuImage.ConvertIconToImage(icon);
        }
        const numArray: Uint8Array = obj;
        if (numArray == null) {
            return undefined;
        }
        return CGImage.FromStream(new MemoryStream(numArray));
    }

    private static ConvertIconToImage(icon: Icon): CGImage {
        return icon.toBitmap();
    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        rect = rect.clone();
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (shadowOffset.Width >= 0) {
                rect.Width = rect.Width + shadowOffset.Width;
            }
            else {
                rect.X = rect.X + shadowOffset.Width;
                rect.Width = rect.Width - shadowOffset.Width;
            }
            if (shadowOffset.Height >= 0) {
                rect.Height = rect.Height + shadowOffset.Height;
            }
            else {
                rect.Y = rect.Y + shadowOffset.Height;
                rect.Height = rect.Height - shadowOffset.Height;
            }
        }
        return rect;
    }

    private static FindCachedImage(src: any, idx: number, name: string): CGImage {
        const weakReference: Out<any> = New.Out();
        let image: CGImage;
        TuImage.myInfo.Source = src;
        TuImage.myInfo.Index = idx;
        TuImage.myInfo.Name = name;
        TuImage.myImages.TryGetValue(TuImage.myInfo, weakReference);
        if (weakReference != null) {
            const target: CGImage = as(weakReference.value, CoreGraphicTypes.CGImage);
            if (target != null) {
                image = target;
                return image;
            }
        }
        image = undefined;
        return image;
    }

    public /*virtual*/  loadImage(): CGImage {
        const index: number = this.Index;
        if (index >= 0) {
            let item: CGImage = undefined;
            const imageList: ImageList = this.ImageList;
            if (imageList != null) {
                item = TuImage.FindCachedImage(imageList, index, undefined);
                if (item != null) {
                    return item;
                }
            }
            const defaultImageList: ImageList = TuImage.DefaultImageList;
            if (defaultImageList != null && defaultImageList != imageList) {
                item = TuImage.FindCachedImage(defaultImageList, index, undefined);
                if (item != null) {
                    return item;
                }
            }
            if (imageList != null && index < imageList.Images.Count) {
                item = imageList.Images[index];
            }
            if (item != null) {
                TuImage.SaveCachedImage(imageList, index, undefined, item);
                return item;
            }
            if (defaultImageList != null && defaultImageList != imageList && index < defaultImageList.Images.Count) {
                item = defaultImageList.Images[index];
            }
            if (item != null) {
                TuImage.SaveCachedImage(defaultImageList, index, undefined, item);
                return item;
            }
            if (item != null) {
                return item;
            }
        }
        const name: string = this.Name;
        if (name != null && name != "") {
            let image: CGImage = undefined;
            const resourceManager: ResourceManager = this.ResourceManager;
            if (resourceManager != null) {
                image = TuImage.FindCachedImage(resourceManager, 0, name);
                if (image != null) {
                    return image;
                }
            }
            const defaultResourceManager: ResourceManager = TuImage.DefaultResourceManager;
            if (defaultResourceManager != null && defaultResourceManager !== resourceManager) {
                image = TuImage.FindCachedImage(defaultResourceManager, 0, name);
                if (image != null) {
                    return image;
                }
            }
            image = TuImage.FindCachedImage(undefined, 0, name);
            if (image != null) {
                return image;
            }
            if (resourceManager != null) {
                try {
                    const obj: any = resourceManager.getObject(name);
                    image = this.convertObjectToImage(obj);
                }
                catch (missingManifestResourceException) {
                    console.error(missingManifestResourceException);
                }
            }
            if (image != null) {
                TuImage.SaveCachedImage(resourceManager, 0, name, image);
                return image;
            }
            if (defaultResourceManager != null && defaultResourceManager !== resourceManager) {
                try {
                    const obj1: any = defaultResourceManager.getObject(name);
                    image = this.convertObjectToImage(obj1);
                }
                catch (missingManifestResourceException1) {
                    console.error(missingManifestResourceException1);
                }
            }
            if (image != null) {
                TuImage.SaveCachedImage(defaultResourceManager, 0, name, image);
                return image;
            }
            try {
                if (!this.NameIsUri) {
                    image = Image.FromFile(name) as any;
                }
                else {
                    /* WebClient webClient = new WebClient();
                    Stream stream = webClient.OpenRead(name);
                    image = System.Drawing.Image.FromStream(stream);
                    stream.Close();
                    webClient.Dispose(); */
                }
                //base.InternalFlags = base.InternalFlags & -4194305;
            }
            catch (exception1) {
                console.error(exception1);
                if (this.ThrowsExceptions) {
                    throw new Error('Hata');
                }
            }
            if (image != null) {
                TuImage.SaveCachedImage(undefined, 0, name, image);
                return image;
            }
        }
        return undefined;
    }

    public /*override*/  Paint(g: Graphics, view: TuView): void {
        const bounds: CGRectangle = this.Bounds;
        let image: CGImage = this.Image;
        const index: number = this.Index;
        if (image == null && index >= 0) {
            const imageList: ImageList = view.ImageList;
            if (imageList != null && index < imageList.Images.Count) {
                image = imageList.Images[index];
            }
        }
        if (image != null) {
            try {
                if (this.Shadowed) {
                    const shadowOffset: CGSize = this.GetShadowOffset(view);
                    const colorMatrix: ColorMatrix = new ColorMatrix();
                    colorMatrix.Matrix00 = 0;
                    colorMatrix.Matrix11 = 0;
                    colorMatrix.Matrix22 = 0;

                    const shadowBrush: SolidBrush = as(this.GetShadowBrush(view), GraphicTypes.SolidBrush);
                    if (shadowBrush == null) {
                        colorMatrix.Matrix30 = 0.5;
                        colorMatrix.Matrix31 = 0.5;
                        colorMatrix.Matrix32 = 0.5;
                        colorMatrix.Matrix33 = 0.5;
                    }
                    else {
                        const color: CGColor = shadowBrush.Color;
                        colorMatrix.Matrix30 = color.R / 255;
                        colorMatrix.Matrix31 = color.G / 255;
                        colorMatrix.Matrix32 = color.B / 255;
                        colorMatrix.Matrix33 = color.A / 255;
                    }
                    const imageAttribute: ImageAttributes = new ImageAttributes();
                    imageAttribute.setColorMatrix(colorMatrix);
                    const rectangle: CGRectangle = new CGRectangle((~~(bounds.X + shadowOffset.Width)), (~~(bounds.Y + shadowOffset.Height)), (~~bounds.Width), (~~bounds.Height));
                    const width: number = image.Size.Width;
                    const size: CGSize = image.Size;
                    (g as any).DrawImage(image, rectangle, 0, 0, width, size.Height, GraphicsUnit.Pixel, imageAttribute);
                }
                (g as any).DrawImage(image, bounds);

            }
            catch (exception1) {
                console.error(exception1);
                /* Exception exception = exception1;
                if ((base.InternalFlags & 4194304) == 0) {
                    base.InternalFlags = base.InternalFlags | 4194304;
                    GoObject.Trace(string.Concat("GoImage.Paint: ", exception.ToString()));
                }
                if (this.ThrowsExceptions) {
                    throw;
                } */
            }
        }
    }

    private resetImage(): void {
        this.myImage = undefined;
    }

    private static SaveCachedImage(src: any, idx: number, name: string, img: CGImage): void {
        TuImage.myInfo.Source = src;
        TuImage.myInfo.Index = idx;
        TuImage.myInfo.Name = name;
        TuImage.myImages.Set(new TuImageInfo(TuImage.myInfo), img);
        TuImage.CleanInfos();
    }

    public /*override*/ setSizeKeepingLocation(s: CGSize): void {
        const bounds: CGRectangle = this.Bounds;
        bounds.Width = s.Width;
        bounds.Height = s.Height;
        const location: CGPoint = this.Location;
        const rectangleF: CGRectangle = this.setRectangleSpotLocation(bounds, this.Alignment, location);
        this.Bounds = rectangleF;
    }

    public /*virtual*/ unloadImage(): void {
        this.resetImage();
        super.InvalidateViews();
    }

    private updateSize(): void {
        if (this.Initializing) {
            return;
        }
        if (this.AutoResizes) {
            try {
                this.updateSize2();
            }
            catch (invalidOperationException) {
                console.error(invalidOperationException);
            }
        }
    }

    private updateSize2(): void {
        const image: CGImage = this.Image;
        if (image != null) {
            const size: CGSize = this.Size;
            const sizeF: CGSize = new CGSize(image.Size.Width, image.Size.Height);
            if (size.NotEquals(sizeF)) {
                this.setSizeKeepingLocation(sizeF);
            }
        }
    }
}

(function staticContructor() {
    (<any>TuImage).myInfo = new TuImageInfo();
    (<any>TuImage).myImages = new Dictionary<TuImageInfo, any>();
})();