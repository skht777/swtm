import { AList } from '$util/List/AList';

export class MockList<V> extends AList<V> {
  public constructor(list: V[]) {
    super(list);
  }

  public add(): MockList<V> {
    throw new Error('unimplemented');
  }

  public filter(): MockList<V> {
    throw new Error('unimplemented');
  }

  public map<W>(): MockList<W> {
    throw new Error('unimplemented');
  }

  public remove(): MockList<V> {
    throw new Error('unimplemented');
  }

  public set(): MockList<V> {
    throw new Error('unimplemented');
  }

  public sort(): MockList<V> {
    throw new Error('unimplemented');
  }
}
