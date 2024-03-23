import { EcosyncCore } from '@ecosync/core';

import { describe, it, expect } from 'bun:test';

describe('EcosyncClient', () => {
    it('should be defined', () => {
        expect(EcosyncCore).toBeDefined();
    });

    it('should be a class', () => {
        expect(EcosyncCore).toBeInstanceOf(Function);
    });
});