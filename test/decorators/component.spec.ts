import {bootstrap, component, provider} from '@ziggurat/tiamat';
import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AureliaAdapter} from '../../src/container';
import {expect} from 'chai';
import 'mocha';

describe('component', () => {
  describe('without providers', () => {
    @component()
    class TestComponent {}

    it('should bootstrap an empty component', async () => {
      return expect(
        await bootstrap(new AureliaAdapter(new AureliaContainer()), TestComponent)
      ).to.be.instanceof(TestComponent);
    });
  });

  describe('with providers', () => {
    @provider()
    class TestProvider {}

    @component({
      providers: [TestProvider],
      inject: [TestProvider]
    })
    class TestComponent {
      constructor(
        public testProvider: TestProvider
      ) {}
    }

    it('should register providers', async () => {
      return expect(
        (await bootstrap(new AureliaAdapter(new AureliaContainer), TestComponent)).testProvider
      ).to.be.instanceOf(TestProvider);
    });
  });

  describe('with definitions', () => {
    @component({
      definitions: {
        'foo': 'bar'
      },
      inject: ['foo']
    })
    class TestComponent {
      constructor(
        public foo: string
      ) {}
    }

    it('should register definitions', async () => {
      return expect(
        (await bootstrap(new AureliaAdapter(new AureliaContainer()), TestComponent)).foo
      ).to.eql('bar');
    });
  });
});
