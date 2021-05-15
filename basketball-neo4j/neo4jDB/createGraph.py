from initConfig import graph

with open(r"D:\Desktop\basketball-neo4j\data\player\player.txt",
          encoding='UTF-8') as f:
    for line in f.readlines():
        rela_array = line.strip("\n").split("\t")
        print(rela_array)
        graph.run("MERGE(p: Player{cate:'%s',Name: '%s'})" % (rela_array[3], rela_array[0]))
        graph.run("MERGE(p: Player{cate:'%s',Name: '%s'})" % (rela_array[3], rela_array[1]))
        graph.run(
            "MATCH(e: Player), (cc: Player) \
            WHERE e.Name='%s' AND cc.Name='%s'\
            CREATE(e)-[r:%s{relation: '%s'}]->(cc)\
            RETURN r" % (rela_array[0], rela_array[1], rela_array[2], rela_array[2])
        )
