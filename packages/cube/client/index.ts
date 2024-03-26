import { EcosyncLogger } from "@ecosync/logger";

const gql = String.raw;

const console = new EcosyncLogger({ name: "Cubejs Service" }).init();

/**
* ## Cubejs Related Service
*/
export class EcosyncCubeClient {
    #graphQlUrl: string;

    constructor({
        graphQlUrl
    }: {
        graphQlUrl: string
    }) {
        this.#graphQlUrl = graphQlUrl;
    }

    async #query(query: string, variables?: object) {
        const url = this.#graphQlUrl;

        const body = JSON.stringify({
            query,
            variables
        });

        console.log(this.#graphQlUrl, body)

        const response = await fetch(url, {
            body, "headers": {
                "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE0MDgyNDksImV4cCI6MTcxMTQ5NDY0OX0.WS_p2neTuhQc2PAeX8s4Mekf3C6zzPlnrJ4ZZjRW6JE",
                "content-type": "application/json",

            },
            method: 'POST',
        })

        return response;
    }

    /**
     * Get All LandfillDumpings
     */
    getResourceCount() {
        const query = gql`
        query GetResrouceCount {
                sts: cube {
                    sts_dumpings {
                        count
                    }
                
                }
                user: cube {
                    users {
                        count
                        
                    }
                }
            
            }
       
        `

        return this.#query(query)

    }

}