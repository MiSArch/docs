import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Lightbox from "./Lightbox";

export default function HylimoDiagram({ name, alt, width, height }) {
    const { colorMode } = useColorMode();
    const image = {
        url: useBaseUrl(`/renderedDiagrams/${name}-${colorMode}.svg`),
        alt,
        width,
        height
    };

    return <Lightbox image={image} />;
}
