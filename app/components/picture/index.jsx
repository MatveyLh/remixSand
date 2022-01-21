import backgroundStyles from '../../styles/background.css';
import { convertSrcSet, getImageTypeFromUrl } from '~/utils/common';
import inputStyles from "~/styles/input.css";

export const IMAGE_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

function Source({ srcList, isLazy, type, ...rest }) {
    if (srcList.length === 0) return null;

    return (
        <source
            {...rest}
            srcSet={isLazy ? undefined : convertSrcSet(srcList)}
            data-srcset={isLazy ? convertSrcSet(srcList) : undefined}
            type={type ?? getImageTypeFromUrl(srcList[0] ?? null) ?? undefined}
        />
    );
}

function getSrcList(src1x, src2x) {
    const srcList = [];

    if (src1x) {
        srcList.push(src1x);

        if (src2x) {
            srcList.push(src2x);
        }
    }

    return srcList;
}

function SourceGroup({ media, images, isLazy }) {
    if (!images || Object.values(images).length === 0) return null;

    return (
        <>
            <Source isLazy={isLazy} srcList={getSrcList(images.webp, images.webp2x)} media={media} />

            <Source isLazy={isLazy} srcList={getSrcList(images.src, images.src2x)} media={media} />
        </>
    );
}

function Image({ className, src, srcSet, loading = 'eager', ...rest }) {
    const isLazy = loading === 'lazy';
    const imgClassName = [className, isLazy ? 'lazyload' : null].filter(Boolean).join(' ');

    return <img className={imgClassName} src={isLazy ? IMAGE_PLACEHOLDER : src} srcSet={isLazy ? undefined : srcSet} data-src={src} data-srcset={srcSet} alt="" {...rest} />;
}

function Picture({ src, src2x, srcWebp, srcWebp2x, loading, alt }) {
    const isLazy = loading === 'lazy';
    return (
        <div className={'backgroundContainer'}>
            <picture>
                {src2x || srcWebp || srcWebp2x ? (
                    <SourceGroup
                        images={{
                            src: src,
                            src2x: src2x,
                            webp: srcWebp,
                            webp2x: srcWebp2x,
                        }}
                        isLazy={isLazy}
                    />
                ) : null}
                <Image className={'image'} src={src ?? undefined} srcSet={src2x ? `${src2x} 2x` : undefined} loading={loading} alt={alt ?? ''} />
            </picture>
        </div>
    );
}

export const links = () => {
    return [{ rel: "stylesheet", href: backgroundStyles }];
};

export default Picture;
