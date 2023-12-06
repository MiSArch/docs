import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Lightbox from "./Lightbox";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function CustomImage({ path, extension, alt, width, height }) {
    const { colorMode } = useColorMode();
    const image = {
        url: useBaseUrl(`${path}-${colorMode}.${extension ?? "svg"}`),
        alt,
        width,
        height
    };

    return <BrowserOnly>{() => <Lightbox image={image} />}</BrowserOnly>;
}
