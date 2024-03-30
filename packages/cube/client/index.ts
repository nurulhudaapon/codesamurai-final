import { EcosyncLogger } from "@ecosync/logger";

const gql = String.raw;

const console = new EcosyncLogger({ name: "Cubejs Service" }).init();

/**
 * ## Cubejs Related Service
 */
export class EcosyncCubeClient {
  #graphQlUrl: string;

  constructor({ graphQlUrl }: { graphQlUrl: string }) {
    this.#graphQlUrl = graphQlUrl;
  }

  async #query(query: string, variables?: object) {
    const url = this.#graphQlUrl;

    const body = JSON.stringify({
      query,
      variables,
    });

    console.log(this.#graphQlUrl, body);

    const response = await fetch(url, {
      body,
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE0ODE5MjYsImV4cCI6MTkxMTU2ODMyNn0.fgCWcMbI8vwtWazlJvPUbva2PgbSs-xDbPMazv2BiFI",
        "content-type": "application/json",
      },
      method: "POST",
    });

    const result = (await response.json()) as { data: unknown };
    console.log(result);
    const flattened = this.#flattenCubeResponse(result);

    return flattened;
  }

  /**
   * Get All LandfillDumpings
   */
  async getResourceCount() {
    const query = gql`
      query GetResrouceCount {
        v: cube {
          vehicle {
            count
          }
        }
        lf: cube {
          transportation {
            count
          }
        }
        sts: cube {
          sts {
            count
          }
        }
        user: cube {
          user {
            count
          }
        }
        role: cube {
          role_permission {
            count
          }
        }
        perm: cube {
          permission {
            count
          }
        }
      }
    `;

    const result = await this.#query(query);

    return result;
  }

  async getTotalWaste(variables?: object) {
    const query = gql`
      query GetTotalWaste($where: RootWhereInput = {}) {
        transportation: cube(where: $where) {
          transportation {
            total_volume
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: { total_volume: number | null };
    };

    return result;
  }

  async getLandfillStats(variables?: object) {
    const query = gql`
      query GetLandfillStats($where: RootWhereInput = {}) {
        landfill: cube(where: $where) {
          landfill {
            total_capacity_tonnes
          }
        }
        tp: cube(where: {
          transportation: {
            landfill_id: {
              set: true
            }
          }
        }) {
          transportation {
            total_volume
            count
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: { total_volume: number | null; count: number | null };
      landfill: { total_capacity_tonnes: number | null; count: number | null };
    };

    return result;
  }

  async getStsStats(variables?: object) {
    const query = gql`
      query GetStsStats($where: RootWhereInput = {}) {
        sts: cube(where: $where) {
          sts {
            total_capacity_tonnes
          }
        }
        tp: cube {
          transportation {
            total_volume
            count
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: { total_volume: number | null; count: number | null };
      sts: { total_capacity_tonnes: number | null; count: number | null };
    };

    return result;
  }

  #flattenCubeResponse(result: { data: unknown }) {
    return Object.values(result.data || ({} as object))
      .flat()
      .flatMap((v) => Object.entries(v).map(([k, v]) => ({ [k]: v })))
      .reduce((prev, curr) => ({ ...curr, ...prev }), {});
  }
}
