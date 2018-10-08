<?php

$handler = new Check();
$handler->main();

class Check
{
    public static $pdo;

    public function __construct()
    {
//        echo date("Ymd His");
        $server_name = "0x00000000.me";
        $username = "root";
        $password = "19897216";
        $db_name = "wenhe-express";
        try {
            Check::$pdo = new PDO("mysql:host=$server_name;dbname=$db_name", $username, $password);
        } catch (PDOException $e) {
            echo '数据库连接失败' . $e->getMessage();
            die;
        }
    }

    public function main()
    {
        if (!isset($_GET['keyword'])) {
            return;
        } else {
            $keyword = $_GET['keyword'];
        }

        if (is_numeric($keyword)) {
            $sql = "SELECT * FROM express WHERE tel = :tel OR number = :number";
            $fields = array(":tel" => $keyword, ":number" => $keyword);
        } elseif (is_string($keyword)) {
            $sql = "SELECT * FROM express WHERE name = :name";
            $fields = array(":name" => $keyword);
        } else {
            return;
        }
        $prepared = Check::$pdo->prepare($sql);
        $prepared->execute($fields);
        $data = $prepared->fetchAll(PDO::FETCH_ASSOC);
        if ($data) {
            $data[0]['express_info'] = $this->getExpress(1);

            $code = 200;
            echo json_encode(['code' => $code, 'data' => $data,]);
        } else {
            $code = 404;
            echo json_encode(['code' => $code]);
        }

    }

    public function getExpress($number)
    {
        $xml_array = simplexml_load_string($this->xml);
        return $xml_array;
    }

    public function motherfucker()
    {
        //新增
        $sql = "insert into test (id,user) values (1,'phpthinking')";
        $res = Check::$pdo->exec($sql);
        echo '影响行数：' . $res;

        //修改
        $sql = "update test set user='phpthinking' where id=1";
        $res = Check::$pdo->exec($sql);
        echo '影响行数：' . $res;

        //查询
        $sql = "select * from test";
        $res = Check::$pdo->query($sql);
        foreach ($res as $row) {
            echo $row['user'] . '<br/>';
        }

        //删除
        $sql = "delete from test where id=1";
        $res = Check::$pdo->exec($sql);
        echo '影响行数：' . $res;
    }

    public $xml = '<?xml version="1.0"?> <ufinterface> <Result> <WaybillProcessInfo> <Waybill_No>500121003301</Waybill_No> <Upload_Time>2015/5/5 19:34:55</Upload_Time> <ProcessInfo>北京市海淀区中关村公司 已揽收</ProcessInfo> </WaybillProcessInfo> <WaybillProcessInfo> <Waybill_No>500121003301</Waybill_No> <Upload_Time>2015/5/5 20:13:20</Upload_Time> <ProcessInfo>北京市海淀区中关村公司 已打包,发往下一站 济南转运中心</ProcessInfo> </WaybillProcessInfo> <WaybillProcessInfo> <Waybill_No>500121003301</Waybill_No> <Upload_Time>2015/5/6 10:21:10</Upload_Time> <ProcessInfo>济南转运中心公司 已发出,下一站 山东省济南市千佛山</ProcessInfo> </WaybillProcessInfo> <WaybillProcessInfo> <Waybill_No>500121003301</Waybill_No> <Upload_Time>2015/5/6 13:36:31</Upload_Time> <ProcessInfo>快件到达 山东省济南市千佛山公司</ProcessInfo> </WaybillProcessInfo> <WaybillProcessInfo> <Waybill_No>500121003301</Waybill_No> <Upload_Time>2015/5/6 13:41:55</Upload_Time> <ProcessInfo>山东省济南市千佛山公司 派件人: ***** 派件中 派件员电话1234567891</ProcessInfo> </WaybillProcessInfo> </Result> </ufinterface>';
}