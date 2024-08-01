import * as assert from 'assert';
import Graph from './Graph';
import ViewStep from './ViewStep';
import { Context } from '../context';
import { RequestData } from '../../api/contract/RequestData';

describe('Graph unit test', () => {

  it('test nexFrom when two steps are conected then the steo one has continue connection to step two', () => {
    const request = new RequestData();
    const context = new Context(request);
    const graph = new Graph();
    const node1 = new ViewStep("node_1");
    const node2 = new ViewStep("node_2");
    graph.nexFrom(node1, node2);

    assert.ok(node1.getNexStepConnection(context));
    assert.equal(node2.id, node1.getNexStepConnection(context).stepTo);
  });

  it('test linkFrom when two steps are linked then step one has connection to step two', () => {
    const graph = new Graph();
    const node1 = new ViewStep("node_1");
    const node2 = new ViewStep("node_2");
    graph.linkFrom(node1, node2, 'custom_link_id');

    const connection = node1.connections['custom_link_id'];

    assert.ok(connection);
    assert.equal(connection.stepTo, node2.id);
  });

  it('test graph when navigate to step that exist then navigation is ok', () => {
    const graph = new Graph();
    const node1 = new ViewStep("node_1");
    const node2 = new ViewStep("node_2");
    const node3 = new ViewStep("node_3");

    graph.nexFrom(node1, node2);
    graph.nexFrom(node2, node3);

    const result = graph.navigate(node3.id);
    assert.ok(result);
    assert.equal(result, node3);
  });
});
