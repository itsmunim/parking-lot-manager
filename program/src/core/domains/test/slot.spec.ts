import {expect} from 'chai';
import Slot from '../slot';
import Car from '../car';

describe('Slot', () => {
  it('can be initialized with a slot number', () => {
    const slot = new Slot('2');
    expect(slot.slotId).to.equal('2');
    expect(slot.car).to.equal(null);
  });

  it('can be initialized with a slot number and car', () => {
    const slot = new Slot('2', new Car('1234', 'Red'));
    expect(slot.slotId).to.equal('2');
    expect(slot.car).to.eql({
      regNumber: '1234',
      bodyColor: 'Red'
    });
    expect(slot.isFree).to.equal(false);
  });

  it('setting a car to it will mark isFree as false', () => {
    const slot = new Slot('2');
    expect(slot.isFree).to.equal(true);
    slot.car = new Car('1234', 'Red');
    expect(slot.isFree).to.equal(false);
  });
});


