import graphqlDocs from "../graphql.mjs"
import { execSync } from "child_process"
import { writeFileSync } from "fs";
import dedent from "dedent";

for (const doc of graphqlDocs) {
    const output = execSync(`npx docusaurus graphql-to-doc:${doc.id} -f`, { encoding: "utf-8" });
    console.log(output);
    const name = doc.id[0].toUpperCase() + doc.id.slice(1);
    writeFileSync(
        `docs/graphql/${doc.id}/generated.md`,
        dedent`
            ---
            id: schema
            slug: /docs/graphql/${doc.id}
            title: ${name} Service GraphQL API
            sidebar_position: 1
            pagination_prev: null
            sidebar_class_name: navbar__toggle
            ---
            import GraphQLDocCardList from "@site/src/components/GraphQLDocCardList";
            
            This is the documentation for the ${name} Service GraphQL API.
            This documentation has been automatically generated from the GraphQL schema.
            ${doc.docs ? `The documentation for the service can be found [here](${doc.docs})` : ""}

            <GraphQLDocCardList />
        `
    );
}