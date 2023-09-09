import { updateUserPoint, TestResult } from "../app/updateUser";

describe("試験登録のテスト", () => {
  // Mockオブジェクトを定義 interfaceを満たしていればいいので、以下のようにobjectで定義すれば良い
  const studentDaoMock = {
    get: jest.fn(),
    update: jest.fn(),
    record: jest.fn(),
  };
  test("30日以内の試験結果の登録テスト", () => {
    const user: TestResult = {
      studentId: "testId0001",
      point: 20,
      testDate: new Date("2023-09-01"),
    };
    // mockが返す情報を定義
    // 関数内でgetが呼ばれた時に返す値を設定してあげる
    const oldUser = {
      studentId: "testId0001",
      point: 30,
      testDate: new Date("2023-08-05"),
    };
    studentDaoMock.get.mockReturnValue(oldUser);

    // updateUserPointを呼ぶ
    const result = updateUserPoint(user, studentDaoMock);

    // テスト結果の確認
    // テストが行われたのが30日以内　かつ　テストの点数が下がっているので、更新されないことを確認
    // updateはされない
    expect(studentDaoMock.update).not.toHaveBeenCalled();
    // 帰ってくるUserは過去のuserが帰ってくる
    expect(result).toBe(oldUser);
  });
});
