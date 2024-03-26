import type { Query } from "@cubejs-client/core";

/*
	"scripts": {
		"dev": "cubejs-server"
	},
	"devDependencies": {
		"@cubejs-backend/postgres-driver": "^0.34.10",
		"@cubejs-backend/server": "^0.34.10"
	},
	"template": "docker",
	"templateVersion": "0.34.10"
	*/
export interface CubejsConfiguration {
  dbType: string | ((context: RequestContext) => string);
  schemaPath: string;
  basePath: string;
  webSocketsBasePath: string;
  logger: (msg: string, params: object) => any;
  // driverFactory: (
  //   context: DriverContext
  // ) => DriverConfig | BaseDriver | Promise<BaseDriver> | Promise<DriverConfig>;
  contextToApiScopes: (context: RequestContext) => string[] | Promise<string[]>;
  contextToAppId: (context: RequestContext) => string;
  contextToOrchestratorId: (context: RequestContext) => string;
  repositoryFactory: (context: RequestContext) => SchemaFileRepository;
  // checkAuth: (req: ExpressRequest, authorization: string) => any;
  // checkSqlAuth: (req: SQLRequest, user: string | null) => any;
  canSwitchSqlUser: (
    current: string | null,
    user: string,
  ) => Promise<boolean> | boolean;
  queryRewrite: (query: Query, context: RequestContext) => object;
  preAggregationsSchema: string | ((context: RequestContext) => string);
  schemaVersion: (context: RequestContext) => string;
  scheduledRefreshTimer: boolean | number;
  scheduledRefreshTimeZones: string[];
  scheduledRefreshContexts: () => Promise<object[]>;
  // extendContext: (req: ExpressRequest) => any;
  compilerCacheSize: number;
  maxCompilerCacheKeepAlive: number;
  updateCompilerCacheKeepAlive: boolean;
  allowUngroupedWithoutPrimaryKey: boolean;
  telemetry: boolean;
  http: {
    cors: {
      methods: string | string[];
      origin: string;
      allowedHeaders: string | string[];
      exposedHeaders: string | string[];
      credentials: boolean;
      maxAge: number;
      preflightContinue: boolean;
      optionsSuccessStatus: number;
    };
  };
  jwt: {
    jwkUrl?: ((payload: any) => string) | string;
    key?: string;
    algorithms?: string[];
    issuer?: string[];
    audience?: string;
    subject?: string;
    claimsNamespace?: string;
  };
  cacheAndQueueDriver: "memory" | "cubestore";
  orchestratorOptions:
    | OrchestratorOptions
    | ((context: RequestContext) => OrchestratorOptions);
  allowJsDuplicatePropsInSchema: boolean;
  // initApp: (app: ExpressApplication) => void;
  processSubscriptionsInterval: number;
}

interface OrchestratorOptions {
  continueWaitTimeout: number;
  redisPrefix: string;
  rollupOnlyMode: boolean;
  queryCacheOptions: {
    refreshKeyRenewalThreshold: number;
    backgroundRenew: boolean;
    queueOptions: QueueOptions;
  };
  preAggregationsOptions: {
    externalRefresh: boolean;
    maxPartitions: number;
    queueOptions: QueueOptions;
  };
}

interface QueueOptions {
  concurrency: number;
  executionTimeout: number;
  orphanedTimeout: number;
  heartBeatInterval: number;
}

interface RequestContext {
  securityContext: {
    id: string;
  };
  requestId: string;
}

interface DriverContext extends RequestContext {
  dataSource: string;
}

interface SchemaFileRepository {
  dataSchemaFiles(): Promise<FileContent[]>;
}

interface FileContent {
  fileName: string;
  content: string;
}
