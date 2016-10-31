export default {
  bipartite: {
    nameCol: 'student',
    edgeCol: 'class',
    graphType: 'bigraph',
    directed: false,
    preserveData: true,
    preserveBigraph: 'no',
    content: `student,class
Steely Dan,gis
Steely Dan,mapping new york
Steely Dan,discrete math
Beyonce,statistical inference
Madonna,discrete math
Madonna,linear algebra
Madonna,essential data structures
Madonna,gis
Adam Levine,algorithms
Adam Levine,probability theory
Adam Levine,statistical inference
Hall and Oates,linear algebra
Hall and Oates,discrete math
Hall and Oates,essential data structures
Nicki Minaj,algorithms
Nicki Minaj,probability theory
Nicki Minaj,statistical inference
Drake,art of the profile
Drake,photo 2
Drake,stabile
Drake,ethics
Drake,business
Justin Bieber,probability theory
Justin Bieber,algorithms
Justin Bieber,statistical inference
Ke$ha,algorithms
Ke$ha,computer science in finance
Ke$ha,management technology
The Eagles,statistical reasoning
The Eagles,gis
The Eagles,computing in context
The Cars,essential data structures
The Cars,statistical reasoning
The Cars,gis
Pat Benatar,computing in context
Pat Benatar,linear algebra
Pat Benatar,gis
Lady Gaga,linear regression models
Lady Gaga,politics of policy
Lady Gaga,essential data structures
Tina Turner,linear algebra
Tina Turner,discrete math
Tina Turner,essential data structures
Fetty Wap,algorithms
Fetty Wap,probability theory
Fetty Wap,statistical inference`
  },
  nested: {
    nameCol: 'child',
    edgeCol: 'parent',
    graphType: 'simple',
    directed: true,
    preserveData: true,
    edgeTypeCol: 'relationship',
    content: `child,parent,relationship
Barbara,Annie,friendly
Bertha,Annie,friendly
Bonnie,Annie,friendly
Cameron,Bonnie,friendly
Calvin,Bonnie,unfriendly
Castor,Bonnie,unknown
Charles,Bertha,friendly
Diana,Calvin,friendly
Debbie,Calvin,unfriendly`
  }
}
