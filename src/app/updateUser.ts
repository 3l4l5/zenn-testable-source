export interface IStudentDao {
  get: (id: string) => TestResult;
  update: (result: TestResult) => boolean;
  record: (result: TestResult) => boolean;
}

export type TestResult = {
  studentId: string;
  point: number;
  testDate: Date;
};

export const updateUserPoint = (
  testResult: TestResult,
  studentDao: IStudentDao
) => {
  const oldTestResult = studentDao.get(testResult.studentId);
  if (!oldTestResult) {
    studentDao.record(testResult);
    return testResult;
  } else {
    const isPointUp = testResult.point >= oldTestResult.point;
    const isMonthPassed =
      Math.floor(
        (testResult.testDate.getTime() - oldTestResult.testDate.getTime()) /
          8640000
      ) > 30;
    if (isMonthPassed) {
      studentDao.update(testResult);
      return testResult;
    } else if (isPointUp) {
      studentDao.update(testResult);
      return testResult;
    } else {
      // 登録しない
      return oldTestResult;
    }
  }
};
