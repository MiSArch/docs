import DocCardList from "@theme/DocCardList";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";

export default function GraphQLDocCardList() {
    const category = useCurrentSidebarCategory();
    return (
        <DocCardList
            items={category.items
                .find((item) => item.label == "Api")
                .items.filter((item) => item.label != "Directives")}
        />
    );
}
