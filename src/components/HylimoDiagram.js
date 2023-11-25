import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function HylimoDiagram({name, alt}) {
    const { colorMode } = useColorMode();
    return (
        <img src={useBaseUrl(`/renderedDiagrams/${name}-${colorMode}.svg`)} alt={alt} />
    );
}