// Usage: npm test

var calculator = require('../reward_calculator.js');

describe("RewardCalculator", function() {
  it("Regular Amarr->Jita T1/BR contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/100,
        /*jumps=*/9,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(9000000);
  });

  it("Regular Amarr->Jita DST contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/50000,
        /*jumps=*/9,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(9000000);
  });

  it("Regular Amarr->Jita freighter contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/9,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(9000000);
  });

  it("Low collateral Amarr->Jita T1/BR contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/100,
        /*jumps=*/9,
        /*collat=*/1000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(826363.6363636362);
  });

  it("Low collateral Amarr->Jita DST contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/50000,
        /*jumps=*/9,
        /*collat=*/1000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(4504500);
  });

  it("Low collateral Amarr->Jita freighter contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/9,
        /*collat=*/1000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(6752250);
  });

  it("High collateral Amarr->Jita T1/BR contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/100,
        /*jumps=*/9,
        /*collat=*/5000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(45000000);
  });

  it("High collateral Amarr->Jita DST contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/50000,
        /*jumps=*/9,
        /*collat=*/5000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(45000000);
  });

  it("High collateral Amarr->Jita freighter contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/9,
        /*collat=*/5000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(60068899.63678466);
  });

  it("Long-jump contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/30,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(30000000);
  });

  it("Short-jump contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/3,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(4000000);
  });

  it("Same-system contract", function() {
    // TODO: fix this case.
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/0,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(undefined);
  });

  it("Rush contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/600000,
        /*jumps=*/9,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/true)).toBe(18000000);
  });

  it("Huge contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/1200000,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(12500000);
  });

  it("Low-sec tiny contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/6,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'L',
        /*is_rush=*/false)).toBe(20000000);
  });

  it("Low-sec small contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/10000,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'L',
        /*is_rush=*/false)).toBe(20000000);
  });

  it("Low-sec JF contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/300000,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'L',
        /*is_rush=*/false)).toBe(95714285.71428572);
  });

  it("Low-sec huge contract", function() {
    expect(calculator.CalcReward(
        /*volume=*/1200000,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'L',
        /*is_rush=*/false)).toBe('Does not fit');
  });


  it("Unspecified params should not produce reward", function() {
    expect(calculator.CalcReward(
        /*volume=*/NaN,
        /*jumps=*/10,
        /*collat=*/1000000000,
        /*type=*/'H',
        /*is_rush=*/false)).toBe(undefined);
    expect(calculator.CalcReward(
        /*volume=*/60000,
        /*jumps=*/NaN,
        /*collat=*/'1000000000',
        /*type=*/'H',
        /*is_rush=*/false)).toBe(undefined);
    expect(calculator.CalcReward(
        /*volume=*/60000,
        /*jumps=*/NaN,
        /*collat=*/'',
        /*type=*/'H',
        /*is_rush=*/false)).toBe(undefined);
  });
});
