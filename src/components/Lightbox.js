import React, { useEffect, useId } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function Lightbox({ image }) {
    const galleryID = useId();
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: "#" + CSS.escape(galleryID),
            children: "a",
            pswpModule: () => import("photoswipe")
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <div className="pswp-gallery" id={galleryID}>
            <a
                href={image.url}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                key={galleryID + "-0"}
                target="_blank"
                rel="noreferrer"
            >
                <img src={image.url} alt={image.alt} />
            </a>
        </div>
    );
}
